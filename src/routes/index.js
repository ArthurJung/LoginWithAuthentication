import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Load from '../pages/Load';
import Login from '../pages/Login';
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword/index'

const Stack = createNativeStackNavigator();

export default function Routes() {
  return(
    <Stack.Navigator>  
      <Stack.Screen
        name="Load"
        component={Load}
        options={{ headerShown: false  }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false  }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false  }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false  }}
      />     
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false  }}
      />      
    </Stack.Navigator>
  );
}