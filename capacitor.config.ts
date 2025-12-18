import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.demo.pg.react',
  appName: 'React Photo Gallery',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: ['https://dev-cs-55-week-11.pantheonsite.io']
  }
};


export default config;
