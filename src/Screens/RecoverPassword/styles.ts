import { styled } from 'styled-components/native'

export const StyledView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.BACKGROUND_PRIMARY};
`

export const TextInputStyle = styled.TextInput`
    height: 40px;
    width: 300px;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.BACKGROUND_SECUNDARY};
    color: ${({ theme }) => theme.colors.TEXT_SECONDARY};
    border-radius: 20px;
`

export const StyledTouchableOpacity = styled.TouchableOpacity`
    height: 35px;
    width: 240px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.INFO};
    border-radius: 20px;
`

export const StyledText = styled.Text`
    color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
`

export const StyledViewButton = styled.View`
    position: absolute;
    bottom: 20px;
    width: 100%;
    align-items: center;
    justify-content: center;
`
