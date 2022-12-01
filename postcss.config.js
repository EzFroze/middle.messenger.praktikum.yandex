module.exports = {
  plugins: [
    require("postcss-nested")({preserveEmpty: true}),
    require("cssnano")
  ]
}
