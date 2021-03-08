import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

import DefaultText from '../components/DefaultText';
import DefaultBoldText from '../components/DefaultBoldText';

const ArtikelDetail = ({ navigation }) => {
	const [detailArtikel, setDetailArtikel] = useState(null);

	useEffect(() => {
		fetch(
			`https://masak-apa-tomorisakura.vercel.app/api/article/${navigation.getParam(
				'tag'
			)}/${navigation.getParam('key')}`
		)
			.then(res => res.json())
			.then(data => setDetailArtikel(data.results));
	}, [navigation]);

	let detail = (
		<DefaultText style={{ textAlign: 'center' }}>Loading...</DefaultText>
	);

	if (detailArtikel)
		detail = (
			<View style={styles.detailContainer}>
				<DefaultBoldText style={{ fontSize: 20, textAlign: 'center' }}>
					{detailArtikel.title}
				</DefaultBoldText>
				<Image
					style={styles.img}
					source={{ uri: detailArtikel.thumb }}
				/>
				<DefaultBoldText style={{ marginBottom: 15 }}>
					Published : {detailArtikel.date_published}
				</DefaultBoldText>
				<DefaultText>{detailArtikel.description}</DefaultText>
			</View>
		);

	return <ScrollView>{detail}</ScrollView>;
};

ArtikelDetail.navigationOptions = navigationData => {
	return {
		headerTitle: '',
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		width: '100%',
		height: 300,
		marginVertical: 10,
	},
	detailContainer: {
		padding: 10,
	},
});

export default ArtikelDetail;
