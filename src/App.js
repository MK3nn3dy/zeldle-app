// imports
import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import { createClient } from '@supabase/supabase-js';
import Hint from "./components/Hint";
import navi from './images/navi.png';


function App() {

  // local state
  const [solution, setSolution] = useState(null);
  const [hint, setHint] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // connect to supabase
  const supabaseUrl = '<removed>';
  const supabaseKey = '<removed>';
  const supabase = createClient(supabaseUrl, supabaseKey);


  // supbase fetch
  useEffect(() => {

    const fetchSolution = async () => {
      // generate random ID
      const randomID = Math.floor(Math.random() * 34 + 1);

      // fetch from supabase
      const { data, error } = await supabase
        .from('solutions')
        .select()
        .eq('id', randomID)
        .single()

        // set error if there is one
        if(error){
          setFetchError('Could not fetch a solution from Supabase');
          setSolution(null);
          setHint(null);
          console.log(error);
        }
        
        if(data){
          setSolution(data.word);
          setHint(data.hint);
        }

    }

    fetchSolution();

  }, [])

  const toggleHint = () => {
      setShowHint(!showHint);
  }

  return (
    <div className="App">
      <h1 id="title">Zeldle</h1>
      <img id="navi" src={navi} onClick={toggleHint}/>
      {solution && <Wordle solution={solution}/>}
      {showHint && <Hint onClick={() => setShowHint(false)} hint={hint}/>}
    </div>
  );
}

export default App;
