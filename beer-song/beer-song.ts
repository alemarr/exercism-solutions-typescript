export const sing = (initialBottlesCount: number = 99, takeDownCount: number = 0) => {
  const song = [];

  for (let i = initialBottlesCount; i >= takeDownCount; i--) {
    const v = verse(initialBottlesCount);

    song.push(v);

    initialBottlesCount--;
  }

  return song.join("\n");
};

export function verse(bottles: number): string {
  let verse;
  switch (bottles) {
    case 0:
      verse = [
        'No more bottles of beer on the wall, no more bottles of beer.',
        'Go to the store and buy some more, 99 bottles of beer on the wall.\n'
      ];
      break;
    case 1:
      verse = [
        `${bottles} bottle of beer on the wall, ${bottles} bottle of beer.`,
        `Take it down and pass it around, no more bottles of beer on the wall.\n`
      ];
      break;
    default:
      const newBottles = bottles - 1;
      const bottleText = newBottles > 1 ? 'bottles' : 'bottle';
      verse = [
        `${bottles} bottles of beer on the wall, ${bottles} bottles of beer.`,
        `Take one down and pass it around, ${newBottles} ${bottleText} of beer on the wall.\n`
      ];
      break;
  }

  return verse.join("\n");
};