import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../components/home';
import Search from '../components/search';

const screens = {
    Home: {
        screen: Home
    },
    Search: {
        screen: Search
    }
}

const route = createStackNavigator(screens);

export default createAppContainer(route);