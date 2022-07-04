using System;
using System.Collections.Generic;

namespace CGDOCSPROJECT.Models
{
    public partial class Folder
    {
        public Folder()
        {
            Files = new HashSet<Files>();
        }

        public int FolderId { get; set; }
        public string FolderName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsFavourite { get; set; }

        public Users CreatedByNavigation { get; set; }
        public ICollection<Files> Files { get; set; }
    }
}
