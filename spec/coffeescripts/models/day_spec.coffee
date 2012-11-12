describe 'BH.Models.Day', ->
  beforeEach ->
    chromeAPI = loadChromeAPI()

    settings = new BH.Models.Settings null,
      chromeAPI: chromeAPI

    @date = moment(new Date('October 11, 2012'))

    @day = new BH.Models.Day {date: @date},
      settings: settings
      chromeAPI: chromeAPI

  describe '#initialize', ->
    it 'sets the id', ->
      expect(@day.id).toEqual('10-11-12')

  describe '#toHistory', ->
    it 'returns the needed properties for the history API', ->
      expect(@day.toHistory()).toEqual
        date: @date

  describe '#toTemplate', ->
    it 'returns the properties needed for a view template', ->
      expect(@day.toTemplate()).toEqual
        title: 'Thursday'
        formalDate: 'October 11th 2012'
        weekUrl: '#weeks/10-8-12'
        id: '10-11-12'
        date: @date

  describe '#startingWeekDay', ->
    it 'returns the starting week date for the day based on the starting week day from the settings', ->
      expect(@day.startingWeekDate()).toEqual moment('10/8/12')
