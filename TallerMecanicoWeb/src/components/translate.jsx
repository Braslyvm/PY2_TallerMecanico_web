import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

const translateText = async (text, sourceLang, targetLang) => {
  const client = new TranslateClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: '', // Reemplaza con tu Access Key ID
      secretAccessKey: '' // Reemplaza con tu Secret Access Key
    }
  });

  const command = new TranslateTextCommand({
    SourceLanguageCode: sourceLang,
    TargetLanguageCode: targetLang,
    Text: text
  });

  try {
    const data = await client.send(command);
    return data.TranslatedText;
  } catch (error) {
    console.error(error);
    return text;
  }
};

export default translateText;