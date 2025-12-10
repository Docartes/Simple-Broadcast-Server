#!/usr/bin/env node

import { program } from 'commander'

program.command('start')
	.action(() => {
		console.log(`Halo World`)
	})

program.parse()