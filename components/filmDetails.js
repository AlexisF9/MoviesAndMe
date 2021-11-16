import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined, // pas encore d'info sur le film, on initialise en undefined
            isLoading: true //on affiche le chargement au chargement de la vue jusqu'au chargement des infos du film
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color="#0000ff"/>
                </View>
            )
        }
    }

    _displayFilm() {
        const {film} = this.state;
        if (this.state.film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(film.backdrop_path)}}
                />
                <Text style={styles.title_text}>{film.title}</Text>
                <TouchableOpacity
                  style={styles.favorite_container}
                  onPress={() => this._toggleFavorite()}>
                  {this._displayFavoriteImage()}
                </TouchableOpacity>
                <Text style={styles.description_text}>{film.overview}</Text>
                <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                    return genre.name;
                    }).join(" / ")}
                </Text>
                <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                    return company.name;
                    }).join(" / ")}
                </Text>
                </ScrollView>
            )
        }
    }

    _toggleFavorite() {
      const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
      this.props.dispatch(action)
    }

    _displayFavoriteImage() {
      var sourceImage = require('../assets/favoris-off.png')
      if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
        sourceImage = require('../assets/favoris-on.png')
      }
      return (
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      )
    }

    componentDidMount() { // s'execute une fois le composant monté (donc apres le constructor et le render)
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
      }
      
    render() {
      return (
        <View style={styles.main_container}>
          {this._displayLoading()}
          {this._displayFilm()}
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
      height: 169,
      margin: 5
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },
    favorite_container: {
      alignItems: 'center', 
    }
  })
  
  const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm // on map que la liste de films favoris pour éviter de mapper tout le state
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail)