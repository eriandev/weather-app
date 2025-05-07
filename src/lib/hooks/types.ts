export type UpdateStore = (query?: string) => Promise<void>

export type UseCurrentWeather = () => {
  updateCurrentStore: UpdateStore
  tryUpdateWithCoords: () => Promise<void>
}
