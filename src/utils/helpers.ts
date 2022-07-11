import AsyncStorage from '@react-native-async-storage/async-storage';
import "intl";
import "intl/locale-data/jsonp/en";

export const cacheInventory = async (inventory: any) => {
	try {
		 AsyncStorage.setItem('inventory', JSON.stringify(inventory));
	} catch (error) {
		return error;
	}
};

export const getInventory = async () => {
    try {
        let inventory = await AsyncStorage.getItem('inventory')
        return JSON.parse(inventory);
    } catch (error) {
        return error;
    }
}

export const clearCachedData = async () => {
    try {
        const key = 'inventory'
        await AsyncStorage.removeItem(key);
    } catch (error) {
        return error;
    }
}

export const titleCase = (str: string) => {
    return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
}

export const shortenXterLength = (string: string, number: number) => {
    if(string?.length < number) {
        return string
    }
    return `${string?.slice(0, number)}...`
}

export const formatPrice = (locale, currency, price) => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(price)
}

export const setUser = async (userData: object) => {
    try {
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
        console.log("Error setting user data", error?.message);
    }
  }
  
  export const getUser = async () => {
    try {
        let user = await AsyncStorage.getItem("userData")
        return JSON.parse(user);
    } catch (error) {
        return error;
    }
  }
  
  export const clearData = async () => {
    try {
        const keys = ['userData', 'inventory'];
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        return error;
    }
  }