import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { useUser } from '@/hooks';

import { AssetByVariant, IconByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

function Example() {
  const { useFetchOneQuery } = useUser();

  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const fetchOneUserQuery = useFetchOneQuery(currentId);

  useEffect(() => {
    if (fetchOneUserQuery.isSuccess) {
      Alert.alert(`Hi, my name is ${fetchOneUserQuery.data.name}`);
    }
  }, [fetchOneUserQuery.isSuccess, fetchOneUserQuery.data]);

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={fetchOneUserQuery.refetch}
    >
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <AssetByVariant
              path={'tom'}
              resizeMode={'contain'}
              style={{ height: 300, width: 300 }}
            />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              Welcome on The Flip Test
            </Text>
            <Text
              style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
            >
              "Do you want to discover some features? Just click on one of the
              three buttons at the bottom of the screen. The first allows you to
              call a REST API. The second lets you change the theme color. And
              the third allows you to change the language.
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <Skeleton
              height={64}
              loading={fetchOneUserQuery.isLoading}
              style={{ borderRadius: components.buttonCircle.borderRadius }}
              width={64}
            >
              <TouchableOpacity
                onPress={() => setCurrentId(Math.ceil(Math.random() * 10 + 1))}
                style={[components.buttonCircle, gutters.marginBottom_16]}
                testID="fetch-user-button"
              >
                <IconByVariant path={'send'} stroke={colors.purple500} />
              </TouchableOpacity>
            </Skeleton>

            <TouchableOpacity
              onPress={onChangeTheme}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <IconByVariant path={'theme'} stroke={colors.purple500} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-language-button"
            >
              <IconByVariant path={'language'} stroke={colors.purple500} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;