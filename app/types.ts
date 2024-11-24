export type ApiResponse = {
	data: DataResponse[];
	pagination: Pagination;
};

export type DataResponse = {
	mal_id: number;
	url: string;
	images: Images;
	trailer: Trailer;
	approved: boolean;
	titles: Titles[];
	title: string;
	title_english: string;
	title_japanese: string;
	title_synonyms: string[];
	type: string;
	source: string;
	episodes: number;
	status: string;
	airing: boolean;
	aired: Aired;
	duration: string;
	rating: string;
	score: number;
	scored_by: number;
	rank: number;
	popularity: number;
	members: number;
	favorites: number;
	synopsis: string;
	background: string;
	season: string;
	year: number;
	broadcast: Broadcast;
	producers: DataTypes[];
	licensors: DataTypes[];
	studios: DataTypes[];
	genres: DataTypes[];
	explicit_genres: DataTypes[];
	themes: DataTypes[];
	demographics: DataTypes[];
};

type Images = Record<
	"jpg" | "webp",
	Record<"image_url" | "small_image_url" | "large_image_url", string>
>;

type Trailer = Record<"youtube_id" | "url" | "embed_url", string>;

type Titles = Record<"type" | "title", string>;

type Aired = {
	from: string;
	to: string;
	prop: Prop;
};

type Prop = {
	from: From;
	to: To;
	string: string;
};

type From = Record<"day" | "month" | "year", number>;

type To = Record<"day" | "month" | "year", number>;

type Broadcast = Record<"day" | "time" | "timezone" | "string", string>;

type DataTypes = {
	mal_id: number;
	type: string;
	name: string;
	url: string;
};

// -------------------- Pagination ------------------- \\

export type Pagination = {
	current_page: number
	last_visible_page: number;
	has_next_page: boolean;
	items: Items;
};

type Items = Record<"count" | "total" | "per_page", number>;