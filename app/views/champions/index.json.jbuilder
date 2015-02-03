json.array!(@champions) do |champion|
  json.extract! champion, :id, :name, :lane, :quickinfo
  json.url champion_url(champion, format: :json)
end
