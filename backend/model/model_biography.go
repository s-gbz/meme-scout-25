package model

type Biography struct {

	SummarySentence string `json:"summarySentence,omitempty"`

	Facts []string `json:"facts,omitempty"`
}