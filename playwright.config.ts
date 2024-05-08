import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,

  retries: 1,
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    //['allure-playwright'],
    ['html']
],
  
  use: {
    //Using process.env.DEV creates the ability to choose the enviroment-
    //while running the test from command line by typing DEV=1 before test run command
    baseURL: process.env.DEV === '1' ? 'https://mcstaging.hubside.store/fr/'
        : process.env.STAGING === '2' ? 'https://mcstaging.hubside.store/fr/'
        : 'https://mcstaging.hubside.store/fr/',

    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 30000,
    viewport: { width: 1920, height: 1080 },
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    },
    // extraHTTPHeaders: {
    //   'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    // }
  },
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown.ts'),

projects: [
    {
      name: 'setup', testMatch: 'auth.setup.ts'
    },
    {
      name: 'articleSetup',
      testMatch: 'newArticle.setup.ts',
      dependencies: ['setup'],
      teardown: 'articleCleanUp'
    },
    {
      name: 'articleCleanUp',
      testMatch: 'articleCleanUp.setup.ts'
    },

    {
      name: 'regression',
      testIgnore: 'likesCounter.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json'},
      dependencies: ['setup'] 
    },
    {
      name: 'likeCounter',
      testMatch: 'likesCounter.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json'},
      dependencies: ['articleSetup'] 
    },
    {
      name: 'likeCounterGlobal',
      testMatch: 'likesCounterGlobal.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json'}      
    },  
    
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'], 
      baseURL: 'https://mcstaging.hubside.store/fr/'
    },
    },

    {
      name: 'staging',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'https://mcstaging.hubside.store/fr/'
    },
    },

    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      }
    },

    
    // {
    //   name: 'mobile',
    //   testMatch: 'testMobile.spec.ts',
    //   use:{
    //     ...devices['iPhone 13 Pro']
    //   } 
    // },

    

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});
