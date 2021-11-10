import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import FilmItem from './filmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
    }

    _loadFilms() {
        //console.log(this.state.searchedText)
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true }) // la page charge

            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => { // +1 à chaque appel
                this.page = data.page // stocke la page où on se trouve 
                this.totalPages = data.total_pages // stocke le total des pages

                this.setState({ 
                    //films: data.results, 
                    films: [ ...this.state.films, ...data.results ],
                    isLoading: false // la page ne charge plus
                })
            })
        }
    }

    _searchFilms() { // remettre la liste des films à 0 avant une nouvelle recherche
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
          }, () => { 
              //console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
              this._loadFilms() // appel la fonction de recherche une fois la liste à 0
          })
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("filmDetails", { idFilm: idFilm })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button title='Rechercher' onPress={() => this._searchFilms()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }} // scroll infini, si le nombre de pages et < au nombre total, on charge une nouvelle page
                />
                { this.state.isLoading ?
                    <View style={styles.loading_container}>
                        <ActivityIndicator size='large' color="#0000ff" />
                    </View>
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5,
      borderWidth: 0
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
  })

export default Search