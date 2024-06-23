import { google } from 'googleapis'

const enviarpedidoinfo = async (pedidoinfo) => {

    const {cliente, origen, fecha, productos, productostext, ciudad, direccion, telefono, total} = pedidoinfo

    const client = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        null,
        process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/spreadsheets']
    )

    const sheets = google.sheets({version: 'v4', auth: client});

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
            values: [[cliente, productostext, origen, fecha, ciudad, direccion, telefono, " ", total]]
        }
    })

}

export default enviarpedidoinfo;