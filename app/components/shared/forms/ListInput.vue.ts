import { Component, Prop } from 'vue-property-decorator';
import { TObsType, IListInput, IListOption, Input, TObsValue } from './Input';
import { Multiselect } from 'vue-multiselect';
import { $t } from '../../../services/i18n';

@Component({
  components: { Multiselect }
})

class ListInput extends Input<IListInput<TObsValue>> {

  static obsType: TObsType;

  @Prop()
  value: IListInput<TObsValue>;
  testingAnchor = `Form/List/${this.value.name}`;

  @Prop({ default: false })
  allowEmpty: boolean;

  @Prop({ default: true })
  internalSearch: boolean;

  @Prop()
  placeholder: string;

  @Prop({ default: false })
  loading: boolean;

  onInputHandler(option: IListOption<string>) {
    this.emitInput({ ...this.value, value: option ? option.value : null });
  }

  onSearchChange(value: string) {
    this.$emit('search-change', value);
  }

  get currentValue() {

    const option = this.value.options.find((opt: IListOption<string>) => {
      return this.value.value === opt.value;
    });

    if (option) return option;
    if (this.allowEmpty) return '';
    return this.value.options[0];
  }


}

ListInput.obsType = 'OBS_PROPERTY_LIST';

export default ListInput;
