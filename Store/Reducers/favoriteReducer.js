const initialState = {favoritesFilm: []}

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1) {
                // Le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state, // on copie le state
                    favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex ) // on redefinit les film favoris (film favoris - le film passé via l'action)
                }
            } else {
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    favoritesFilm: [...state.favoritesFilm, action.value] // copie du tableau de films favoris et on ajoute le nouveau film
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite