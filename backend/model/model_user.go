package model

type User struct {

	Id int32 `json:"id,omitempty"`

	Name string `json:"name,omitempty"`

	ProfilePicture string `json:"profilePicture,omitempty"`

	Email string `json:"email,omitempty"`

	Age int32 `json:"age,omitempty"`

	Gender string `json:"gender,omitempty"`

	SexualPreference string `json:"sexualPreference,omitempty"`

	MemePreference *MemePreference `json:"memePreference,omitempty"`

	Biography *Biography `json:"biography,omitempty"`

	Matches []User `json:"matches,omitempty"`
}