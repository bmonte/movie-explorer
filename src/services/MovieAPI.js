import axios from 'axios'

const KEY = 'a7b66ad3a98a9379e6353f576ca067d2';

export default {
	fetchSingleMovie (id) {
		return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
			.then(response => {
				return response.data
			})
	},

	fetchMovieCredits (id) {
		return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}`)
			.then(response => {
				return response.data
			})
	},

	fetchMovieImages (id) {
		return axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${KEY}`)
			.then(response => {
				return response.data
			})
	}, 

	fetchMovieRecommendations (id) {
		return axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${KEY}`)
			.then(response => {
				return response.data
			})
	}, 

	fetchMovieCollection (order_by, page) {
		return axios.get(`https://api.themoviedb.org/3/movie/${order_by}?api_key=${KEY}&page=${page}`)
			.then(response => {
				return response.data
			})
	},

	searchMovies (query, page) {
		return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${query}&page=${page}&include_adult=false`)
			.then(response => {
				return response.data
			})
	},
}