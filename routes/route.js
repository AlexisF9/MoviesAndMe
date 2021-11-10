import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import filmDetails from '../components/filmDetails';
import Search from '../components/search';

const screens = {
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    filmDetails: {
        screen: filmDetails
    }

}

const route = createStackNavigator(screens);

export default createAppContainer(route);