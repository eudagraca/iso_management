export default function Select({ values }) {
 return <select class="uk-select uk-margin-small-top" name="type" required="true">
    <option value="">Por favor seleccione...</option>
    {values.map(function(value, index) {
      return <option index={index} value={value.key}>{value.value}</option>;
    })}
  </select>;
}
