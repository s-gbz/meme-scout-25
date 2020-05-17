package model

type Message struct {

	Id int32 `json:"id,omitempty"`

	Sender int32 `json:"sender,omitempty"`

	Receiver int32 `json:"receiver,omitempty"`

	Text string `json:"text,omitempty"`
}