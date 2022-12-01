const useCase = require('../../../src/usecases/update-base')

const callUseCase = async (resultOfSaveMovies, modified) => {
  const getMovies = jest.fn().mockResolvedValue([])
  const saveMovies = jest.fn().mockResolvedValue(resultOfSaveMovies)
  const output = await useCase({ getMovies, saveMovies })
  expect(output).toStrictEqual({ modified })
}

it('should be modified when at least one movie has inserted', async () => {
  await callUseCase([1], true)
})

it('should not be modified when no movie has inserted', async () => {
  await callUseCase([], false)
})
