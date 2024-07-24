import { Link } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Footer = () => {
  return (
    <View style={tw`flex-row justify-between p-4 bg-white`}>
      <TouchableOpacity style={tw`p-2 rounded-full bg-gray-200`}>
        <Text style={tw`text-gray-600 font-bold`}><Link  href={"/index"}>🏠</Link></Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`p-2 rounded-full bg-gray-200`}>
        <Text style={tw`text-gray-600 font-bold`}>📅</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`p-4 rounded-full bg-green-500`}>
        <Text style={tw`text-white font-bold`}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`p-2 rounded-full bg-gray-200`}>
        <Text style={tw`text-gray-600 font-bold`}>🔔</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`p-2 rounded-full bg-gray-200`}>
        <Text style={tw`text-gray-600 font-bold`}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;