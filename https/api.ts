import axios from 'axios';

export interface TrendingMeme {
    title: string
    url: string
    created_utc: number
}
export interface TopMeme {
    title: string
    url: string
    created_utc: number
}
export interface Quotes{
    // body: string
    id: number
    setup: string
    punchline:string
}

export const api = () => {

    const getTrending = async (): Promise<TrendingMeme[]> => {
        const result = await axios.get('https://reddit-meme.p.rapidapi.com/memes/trending',
            {
                headers: {
                    'X-RapidAPI-Key': '92bc5d9eeamshdc447ff1b9c98e9p1fc1d9jsnae17568cae4d',
                    'X-RapidAPI-Host': 'reddit-meme.p.rapidapi.com'
                }
            })
        return result.data;
    }

    const getTopMemes = async (): Promise<TopMeme[]> => {
        const response = await axios.get('https://reddit-meme.p.rapidapi.com/memes/top',
            {
                headers: {
                    'X-RapidAPI-Key': '92bc5d9eeamshdc447ff1b9c98e9p1fc1d9jsnae17568cae4d',
                    'X-RapidAPI-Host': 'reddit-meme.p.rapidapi.com'
                }
            })
        return response.data;
    }

    const getQuotes = async (): Promise<Quotes[]> => {
        const quotes = await axios.get('https://dad-jokes.p.rapidapi.com/random/joke',
            {
                headers: {
                    'X-RapidAPI-Key': '92bc5d9eeamshdc447ff1b9c98e9p1fc1d9jsnae17568cae4d',
                    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
                }
            })
        return quotes.data.body;
    }

    const getJokes = async (): Promise<Quotes[]> => {
        const quotes = await axios.get('https://dad-jokes.p.rapidapi.com/random/joke',
            {
                headers: {
                    'X-RapidAPI-Key': '92bc5d9eeamshdc447ff1b9c98e9p1fc1d9jsnae17568cae4d',
                    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
                }
            })
        return quotes.data;
    }

    return {
        getTrending,
        getTopMemes,
        getQuotes,
        getJokes
    }
}