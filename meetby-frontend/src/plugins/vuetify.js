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
            paletteRed: '#B00020',
            paletteOrange: '#CC4700',
            paletteGreen: '#008800',
            paletteGrey: '#EAEAEA',
            error: '#B00020',
            success: '#008800',
            warning: '#CC4700',
            background: '#FFFFFF',
          },
        },
      },
    },
})
