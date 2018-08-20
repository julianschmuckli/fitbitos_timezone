function TimeZone(props) {
  return (
    <Page>
      <Section title={<Text bold align="center">Your timezone</Text>}>
        <TextInput
          label="Name of your timezone"
          title="Name of your timezone"
          settingsKey="home"
        />
      </Section>
      <Section
        title={<Text bold align="center">Different timezone</Text>}>
        <TextInput
          label="Name of different timezone"
          title="Name of different timezone"
          settingsKey="timezoneName"
        />
        <Select
          label={`Select timezone UTC`}
          selectViewTitle="Select timezone UTC"
          settingsKey="timezone"
          options={[
            {name:"UTC-12:00", value:"-12"},
            {name:"UTC-11:00", value:"-11"},
            {name:"UTC-10:00", value:"-10"},
            {name:"UTC-09:30", value:"-9.5"},
            {name:"UTC-09:00", value:"-9"},
            {name:"UTC-08:00", value:"-8"},
            {name:"UTC-07:00", value:"-7"},
            {name:"UTC-06:00", value:"-6"},
            {name:"UTC-05:00", value:"-5"},
            {name:"UTC-04:00", value:"-4"},
            {name:"UTC-03:30", value:"-3.5"},
            {name:"UTC-03:00", value:"-3"},
            {name:"UTC-02:00", value:"-2"},
            {name:"UTC-01:00", value:"-1"},
            {name:"UTC±00:00", value:"0"},
            {name:"UTC+01:00", value:"1"},
            {name:"UTC+02:00", value:"2"},
            {name:"UTC+03:00", value:"3"},
            {name:"UTC+03:30", value:"3.5"},
            {name:"UTC+04:00", value:"4"},
            {name:"UTC+04:30", value:"4.5"},
            {name:"UTC+05:00", value:"5"},
            {name:"UTC+05:30", value:"5.5"},
            {name:"UTC+05:45", value:"5.75"},
            {name:"UTC+06:00", value:"6"},
            {name:"UTC+06:30", value:"6.5"},
            {name:"UTC+07:00", value:"7"},
            {name:"UTC+08:00", value:"8"},
            {name:"UTC+08:45", value:"8.75"},
            {name:"UTC+09:00", value:"9"},
            {name:"UTC+09:30", value:"9.5"},
            {name:"UTC+10:00", value:"10"},
            {name:"UTC+10:30", value:"10.5"},
            {name:"UTC+11:00", value:"11"},
            {name:"UTC+12:00", value:"12"},
            {name:"UTC+12:45", value:"12.75"},
            {name:"UTC+13:00", value:"13"},
            {name:"UTC+14:00", value:"14"}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(TimeZone);