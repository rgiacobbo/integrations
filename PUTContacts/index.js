const { google } = require('googleapis');

const sheets = google.sheets('v4');
const hubspot = require('@hubspot/api-client');

module.exports = async function (context, req) {
  const hubspotClient = new hubspot.Client({
    accessToken: 'Colocar o Token do Hubspot aqui',
  });
  const spreadsheetId = 'ID da planilha';
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  try {
    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const data = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Página1!A:F',
    });

    const response = (await sheets.spreadsheets.get(req)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));

    const dominio = new RegExp(`@${getRows.data.values[1][4]}\\.`);
    if (dominio !== getRows.data.values[1][4]) {
      throw new Error();
    }

    const contactObj = {
      properties: {
        firstname: getRows.data.values[1][0],
        lastname: getRows.data.values[1][1],
        email: getRows.data.values[1][2],
        phone: getRows.data.values[1][3],
        company: getRows.data.values[1][4],
        website: getRows.data.values[1][5],
      },
    };
    const companyObj = {
      properties: {
        domain: getRows.data.values[1][5],
        name: getRows.data.values[1][4],
      },
    };

    const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj);
    const createCompanyResponse = await hubspotClient.crm.companies.basicApi.create(companyObj);
    await hubspotClient.crm.associations.v4.basicApi.create(
      'companies',
      createCompanyResponse.id,
      'contacts',
      createContactResponse.id,
      [
        {
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: AssociationTypes.companyToContact,
          // AssociationTypes contains the most popular HubSpot defined association types
        },
      ]
    );
  } catch (err) {
    console.error(err);
  }
};
