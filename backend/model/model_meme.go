package model

type Meme struct {

	Id int32 `json:"id,omitempty"`

	FileBlob string `json:"fileBlob,omitempty"`

	Tags []string `json:"tags,omitempty"`
}