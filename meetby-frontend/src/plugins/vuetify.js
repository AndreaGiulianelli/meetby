import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@/styles/main.scss'

export default createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'meetbyTheme',
      themes: {
        meetbyTheme: {
          dark: false,
          colors: {
            paletteBlack: '#000000',
            paletteWhite: '#FFFFFF',
            paletteBlue: '#0070F2',
            paletteRed: '#C50000',
            paletteOrange: '#FF4F0F',
            paletteGreen: '#008800',
            paletteGrey: '#EAEAEA',
            error: '#C50000',
            success: '#008800',
            warning: '#FF4F0F',
            background: '#FFFFFF',
          },
        },
      },
    },
})
