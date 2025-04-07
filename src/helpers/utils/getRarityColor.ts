export const getRarityColor = (
  item: string | null | undefined,
  transparency = 1
) => {
  const rarityColors = {
    common: `rgba(148, 148, 148, ${transparency})`,
    uncommon: `rgba(49, 84, 255, ${transparency})`,
    rare: `rgba(0, 127, 255, ${transparency})`,
    epic: `rgba(173, 56, 242, ${transparency})`,
    legendary: `rgba(255, 134, 23, ${transparency})`,
    divine: `rgba(226, 28, 28, ${transparency})`,
    token: `rgba(245, 216, 51, ${transparency})`,
  };

  switch (item) {
    case undefined:
    case null:
      return rarityColors.legendary;
    case 'Collection':
      return rarityColors.legendary;
    case 'Common':
      return rarityColors.common;
    case 'Rare':
      return rarityColors.rare;
    case 'Epic':
      return rarityColors.epic;
    case 'Legendary':
      return rarityColors.legendary;
    case 'Divine':
      return rarityColors.divine;
    case 'Token':
      return rarityColors.token;
    default:
      return rarityColors.legendary;
  }
};
