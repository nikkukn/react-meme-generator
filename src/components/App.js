import { useState, useEffect } from 'react';
import InputFields from './InputFields';
import PreviewMeme from './PreviewMeme';
import Overlay from './Overlay';

// Async Function to get all empty Memes available
async function getPreviewTemplates(setter) {
  try {
    const response = await fetch('https://api.memegen.link/templates/');
    const body = await response.json();
    setter(body.map((item) => item.blank.split('.png')[0].split('/')[4]));
  } catch (error) {
    console.log(error);
  }
}

export default function App() {
  // Storing all URLs for preview in an array
  const [templateNames, setTemplateNames] = useState([]);
  // Switch between Overlay active and hidden
  const [overlayHidden, setOverlayHidden] = useState(true);
  // Saving the name of the chosen meme
  const [chosenMeme, setChosenMeme] = useState('');
  // Saving the top text
  const [topText, setTopText] = useState('');
  // Saving the bottom text
  const [bottomText, setBottomText] = useState('');
  // Saving the complete meme URL of the generated meme
  const [memeUrl, setMemeUrl] = useState('');

  // Using useEffect to setTemplateNames after the fetch is resolved
  useEffect(() => {
    getPreviewTemplates(setTemplateNames);
  }, []);

  return (
    <>
      <h1>Meme Generator</h1>
      <InputFields
        setOverlayHidden={setOverlayHidden}
        topText={topText}
        setTopText={setTopText}
        bottomText={bottomText}
        setBottomText={setBottomText}
        chosenMeme={chosenMeme}
        memeUrl={memeUrl}
        setMemeUrl={setMemeUrl}
      />
      <PreviewMeme chosenMeme={chosenMeme} memeUrl={memeUrl} />
      <Overlay
        templateNames={templateNames}
        overlayHidden={overlayHidden}
        setOverlayHidden={setOverlayHidden}
        setChosenMeme={setChosenMeme}
        setMemeUrl={setMemeUrl}
      />
    </>
  );
}
