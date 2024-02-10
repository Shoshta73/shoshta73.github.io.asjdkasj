module.exports = {
  bracketSameLine: true,
  arrowParens: "always",
  bracketSpacing: true,
  printWidth: 120,
  proseWrap: "always",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  trailingComma: "none",
  useTabs: false,
  importOrder: ["<THIRD_PARTY_MODULES>", "^[./]", "^[./*.css]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")]
};
