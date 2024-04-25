import React from 'react';
import { View, Text } from 'react-native';
import { Header } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Title } from "./styles";

export function CustomHeader() {
    return (
        <Container>
        <MaterialCommunityIcons name="cookie-alert-outline" size={30} color="red" />
        <Title>Willy Wonka</Title>
      </Container>
    );
  }; 

  