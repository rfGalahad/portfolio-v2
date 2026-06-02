export const toSkillItem = (item, cat) => ({
  icon: null,
  img: null,
  ...(typeof item === 'string' ? { text: item } : item),
  cat,
});