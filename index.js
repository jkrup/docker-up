#!/usr/bin/env node
const NAME = 'docker-up'
const child_process = require('child_process')
const fs = require('fs')
const util = require('util')
const exec = util.promisify(child_process.exec)

var args = process.argv.slice(2)

function help() {
}

async function main () {
  // Help
  if (args[0] === 'help') {
    console.log(
      `
Usage: ${NAME}

    This will automatically run the following commands:
        heroku create
        heroku container:login
        heroku container:push web -a APP_NAME
        heroku container:release web -a APP_NAME

Usage: ${NAME} -u | --update

    This will only run:
        heroku container:login
        heroku container:push web -a APP_NAME
        heroku container:release web -a APP_NAME
    `.trim()
    )
    process.exit(0)
  }

  let appname
  if (args[0] === '-u' || args[0] === '--update') {
    try {
      appname = fs.readFileSync('.heroku_app_name').toString()
      console.log(appname)
    } catch (err) {
      console.error(
        `[ERROR]: Unable to update because I don't know the APPNAME, either create a file called .heroku_app_name with the APP_NAME, or run without the -u option to create a new APP_NAME`
      )
      process.exit(1)
    }
  } else {
    let { error, stdout } = await exec('heroku create')
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    appname = stdout
      .split('|')[0]
      .split('.')[0]
      .split('://')[1] // TODO: SAFER
  }
  fs.writeFile('.heroku_app_name', appname, () => {})
  await exec(`heroku container:login`)
  await exec(`heroku container:push web -a ${appname}`)
  await exec(`heroku container:release web -a ${appname}`)
  console.log(
    `Your app should be available at https://${appname}.herokuapp.com/`
  )
}

main()
