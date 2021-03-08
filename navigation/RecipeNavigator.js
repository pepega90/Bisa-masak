import React from 'react';
import { Text } from 'react-native';
import {
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constant/Colors';
import NewRecipesScreens from '../screens/NewRecipesScreens';
import CategoryRecipeScreens from '../screens/CategoryRecipeScreens';
import RecipeList from '../screens/RecipeList';
import DetailRecipeScreens from '../screens/DetailRecipeScreens';
import ArtikelInspirasi from '../screens/ArtikelInspirasi';
import ArtikelGayaHidup from '../screens/ArtikelGayaHidup';
import ArtikelTips from '../screens/ArtikelTips';
import ArtikelDetail from '../screens/ArtikelDetail';

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Colors.mainColor,
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerTintColor: '#fff',
};

const RecipeNavigator = createStackNavigator(
	{
		Recipes: {
			screen: NewRecipesScreens,
			navigationOptions: {
				headerTitle: 'Resep Terbaru',
			},
		},
		DetailRecipe: DetailRecipeScreens,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const categoryRecipesNav = createStackNavigator(
	{
		Category: CategoryRecipeScreens,
		RecipeList: RecipeList,
		DetailRecipe: DetailRecipeScreens,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const tabScreenConfig = {
	Recipes: {
		screen: RecipeNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<MaterialCommunityIcons
						name="food-variant"
						size={25}
						color={tabInfo.tintColor}
					/>
				);
			},
			tabBarColor: Colors.mainColor,
			tabBarLabel: (
				<Text style={{ fontFamily: 'open-sans-bold' }}>Recipes</Text>
			),
		},
	},
	Category: {
		screen: categoryRecipesNav,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons
						name="ios-restaurant"
						size={25}
						color={tabInfo.tintColor}
					/>
				);
			},
			tabBarColor: Colors.secondaryColor,
			tabBarLabel: (
				<Text style={{ fontFamily: 'open-sans-bold' }}>Category</Text>
			),
		},
	},
};

const RecipeCategoryTabs = createMaterialBottomTabNavigator(tabScreenConfig, {
	activeColor: 'white',
	shifting: true,
});

const artikelInspirasi = createStackNavigator(
	{
		ArtikelInspirasi: {
			screen: ArtikelInspirasi,
			navigationOptions: {
				title: 'Inspirasi Dapur',
			},
		},
		DetailArtikel: ArtikelDetail,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: 'teal',
			},
			headerTitleStyle: {
				fontFamily: 'open-sans-bold',
			},
			headerBackTitleStyle: {
				fontFamily: 'open-sans-bold',
			},
			headerTintColor: '#fff',
		},
	}
);

const artikelGayaHidup = createStackNavigator(
	{
		ArtikelGayaHidup: {
			screen: ArtikelGayaHidup,
			navigationOptions: {
				title: 'Makanan & Gaya Hidup',
			},
		},
		DetailArtikel: ArtikelDetail,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: 'steelblue',
			},
			headerTitleStyle: {
				fontFamily: 'open-sans-bold',
			},
			headerBackTitleStyle: {
				fontFamily: 'open-sans-bold',
			},
			headerTintColor: '#fff',
		},
	}
);

const artikelTips = createStackNavigator(
	{
		ArtikelTips: {
			screen: ArtikelTips,
			navigationOptions: {
				title: 'Tips Masak',
			},
		},
		DetailArtikel: ArtikelDetail,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: 'salmon',
			},
			headerTitleStyle: {
				fontFamily: 'open-sans-bold',
			},
			headerBackTitleStyle: {
				fontFamily: 'open-sans-bold',
			},
			headerTintColor: '#fff',
		},
	}
);

const ArticleTabs = {
	Inspirasi: {
		screen: artikelInspirasi,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<MaterialCommunityIcons
						name="food-variant"
						size={25}
						color={tabInfo.tintColor}
					/>
				);
			},
			tabBarColor: 'teal',
			tabBarLabel: (
				<Text style={{ fontFamily: 'open-sans-bold' }}>
					Inspirasi Dapur
				</Text>
			),
		},
	},
	Gaya: {
		screen: artikelGayaHidup,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<MaterialCommunityIcons
						color={tabInfo.tintColor}
						name="food"
						size={25}
					/>
				);
			},
			tabBarColor: 'steelblue',
			tabBarLabel: (
				<Text style={{ fontFamily: 'open-sans-bold' }}>
					Makanan & Gaya
				</Text>
			),
		},
	},
	Tips: {
		screen: artikelTips,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<MaterialIcons
						name="food-bank"
						size={25}
						color={tabInfo.tintColor}
					/>
				);
			},
			tabBarColor: 'salmon',
			tabBarLabel: (
				<Text style={{ fontFamily: 'open-sans-bold' }}>Tips Masak</Text>
			),
		},
	},
};

const ArticleConfig = createMaterialBottomTabNavigator(ArticleTabs, {
	activeColor: 'white',
	shifting: true,
});

const MainNavigator = createDrawerNavigator(
	{
		Home: RecipeCategoryTabs,
		Artikel: ArticleConfig,
	},
	{
		contentOptions: {
			activeTintColor: Colors.mainColor,
			labelStyle: {
				fontFamily: 'open-sans-bold',
			},
		},
	}
);

export default createAppContainer(MainNavigator);
