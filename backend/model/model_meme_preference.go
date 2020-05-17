package model

type MemePreference struct {

	LikedTags []string `json:"likedTags,omitempty"`

	UploadedTags []string `json:"uploadedTags,omitempty"`
}