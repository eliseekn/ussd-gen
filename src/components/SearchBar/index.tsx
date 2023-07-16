import React from 'react'
import {Searchbar} from 'react-native-paper'

type Props = {
    onSearch: (text: string) => void
    searchQuery: string
}

const SearchBar: React.FC<Props> = ({onSearch, searchQuery}) => {
    return (
        <Searchbar
            placeholder="Rechercher"
            onChangeText={onSearch}
            value={searchQuery}
            style={{marginBottom: 15, backgroundColor: 'white'}}
        />
    )
}

export default SearchBar
