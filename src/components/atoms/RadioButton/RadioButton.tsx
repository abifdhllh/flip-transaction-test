import type { FC } from 'react';

import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
  RadioButton as RNRadioButton,
} from 'react-native-simple-radio-button';

import { useTheme } from '@/theme';

export type RadioValue = {
  label: string;
  value: string;
};

type Props = {
  onPress: (val: string | number) => void;
  options: RadioValue[];
  selected?: string | number;
};

const RadioButton: FC<Props> = ({ selected, options = [], onPress }) => {
  const { colors, gutters, fonts } = useTheme();

  return (
    <RadioForm animation={true} style={gutters.gap_12}>
      {options.map((obj, i) => (
        <RNRadioButton key={i} labelHorizontal={true}>
          <RadioButtonInput
            buttonInnerColor={colors.orange}
            buttonOuterColor={colors.orange}
            buttonOuterSize={20}
            buttonSize={10}
            index={i}
            isSelected={selected === obj?.value}
            obj={obj}
            onPress={onPress}
          />
          <RadioButtonLabel
            index={i}
            labelHorizontal={true}
            labelStyle={[fonts.reverseDefault, fonts.bold]}
            obj={obj}
            onPress={onPress}
          />
        </RNRadioButton>
      ))}
    </RadioForm>
  );
};

export default RadioButton;
