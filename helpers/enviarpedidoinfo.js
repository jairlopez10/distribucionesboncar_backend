import { google } from 'googleapis'

const enviarpedidoinfo = async (pedidoinfo) => {

    const {cliente, origen, fecha, cedula, productos, productostext, ciudad, direccion, telefono, total} = pedidoinfo
    
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    
    const sheets = google.sheets({version: 'v4', auth});

    const rangenextrow = 'Settings!A2'

    const responseget = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: rangenextrow,
    })

    const nextrowtoprint = +responseget.data.values[0][0]

    const range = `Sells!B${nextrowtoprint}`;

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [[cliente, productostext, origen, fecha, ciudad, direccion, telefono, cedula, total]]
        }
    })

}

export default enviarpedidoinfo;