describe 'BH.Lib.ExampleTags', ->
  beforeEach ->
    @exampleTags = new BH.Lib.ExampleTags()
    persistence.tag().import.andCallFake (tags, callback) ->
        callback()

  describe '#load', ->
    describe 'when user is not logged in', ->
      beforeEach ->
        global.user =
          isLoggedIn: jasmine.createSpy('isLoggedIn').andReturn false

      it 'calls the passed callback', ->
        callback = jasmine.createSpy('callback')
        @exampleTags.load(callback)
        expect(callback).toHaveBeenCalled()

      it 'does not fetch the tags to sync the changes', ->
        @exampleTags.load()
        expect(persistence.tag().fetchTags).not.toHaveBeenCalled()

    describe 'when user is logged in', ->
      beforeEach ->
        global.user.isLoggedIn.andReturn true

      it 'does fetch the tags to sync the changes', ->
        @exampleTags.load()
        expect(persistence.tag().fetchTags).toHaveBeenCalled()

