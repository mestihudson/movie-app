(async () => {
  const [ script ] = process.argv.slice(2)
  console.log(await require('./helpers')[script]())
  process.exit(0)
})()
