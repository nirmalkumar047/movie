import { use, useEffect,useState } from 'react'
import Search from './components/Search.jsx'
 
const API_BASE_URL = 'https://www.themoviedb.org/settings/api';
const API_KEY =import.meta.env.VITE_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = () => {
   const [searchTerm, setSearchTerm]= useState('');
   const [errorMessege , setErrorMessege]= useState('');
   const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
     
      const response = await fetch(endpoint, API_OPTIONS); 
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(` Error fetching messeges: ${error}`);
      setErrorMessege('An error occurred while fetching data ');
      
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []);
  
   return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
      <header>
        <img src="./hero.png" alt="hero" />
        <h1>
          Find <span className='text-gradient'>Movies</span>You'll Enjoy Watching 
        </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className='text-white '>{searchTerm}</h1>
      </header>
      <section className='all-movies'>
        <h2>All Movies</h2>

        {errorMessege && <p className='text-red-500'>{errorMessege}</p>}


      </section>
      

      </div> 
    </main>
  )
}

export default App