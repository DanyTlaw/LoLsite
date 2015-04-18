json.array!(@posts) do |post|
  json.extract! post, :id, :string, :text
  json.url post_url(post, format: :json)
end
