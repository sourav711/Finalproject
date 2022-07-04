using System;
using System.Collections.Generic;

namespace CGDOCSPROJECT.Models
{
    public partial class Files
    {
        public int DocumentId { get; set; }
        public string DocumentName { get; set; }
        public string ContentType { get; set; }
        public long Size { get; set; }
        public int? CreatedBy { get; set; }
        public int? FolderId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? FavouriteFiles { get; set; }

        public Users CreatedByNavigation { get; set; }
        public Folder Folder { get; set; }
    }
}
