const SECONDS_IN_YEAR = 31557600;

const planets = {
  earth: 1,
  mercury: 0.2408467,
  venus: 0.61519726,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132
}

export const age = (planet: keyof typeof planets, seconds: number) => {
  const planetSeconds = planets[planet] * SECONDS_IN_YEAR;
  return Math.round((seconds / planetSeconds) * 1e2 ) / 1e2;
}
